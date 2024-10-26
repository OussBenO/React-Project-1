import React from 'react';
import { Check, Trash2, Circle } from 'lucide-react';
import { Todo } from '../types';
import { Language } from '../translations';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  language: Language;
}

export function TodoItem({ todo, onToggle, onDelete, language }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-blue-100 border-blue-200',
    medium: 'bg-yellow-100 border-yellow-200',
    high: 'bg-red-100 border-red-200'
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US');
  };

  return (
    <div
      className={`flex items-center p-4 mb-2 rounded-lg border-2 transition-all duration-200 ${
        priorityColors[todo.priority]
      } ${todo.completed ? 'opacity-60' : ''}`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className="p-1 rounded-full hover:bg-white/50 transition-colors"
      >
        {todo.completed ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      <span className={`flex-1 mx-4 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.text}
      </span>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">
          {formatDate(todo.createdAt)}
        </span>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1 rounded-full hover:bg-white/50 transition-colors"
        >
          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}