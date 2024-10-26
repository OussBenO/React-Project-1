import React, { useState, useEffect } from 'react';
import { ListTodo, Languages } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types';
import { translations, Language } from './translations';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
    return [];
  });

  const [language, setLanguage] = useState<Language>('fr');
  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: 'low' | 'medium' | 'high') => {
    setTodos([
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        priority,
        createdAt: new Date()
      },
      ...todos
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ListTodo className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Languages className="w-5 h-5" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>

          <TodoInput onAdd={addTodo} language={language} />

          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                language={language}
              />
            ))}
            {todos.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                {t.nothingTodo}
              </p>
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              {todos.filter((t) => t.completed).length} {t.completed} {todos.length} {t.completed_full}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;