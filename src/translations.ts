export const translations = {
  en: {
    title: 'Todo List',
    addPlaceholder: 'What needs to be done?',
    addButton: 'Add',
    nothingTodo: 'No todos yet. Add one above!',
    priority: {
      low: 'Low',
      medium: 'Medium',
      high: 'High'
    },
    completed: 'of',
    completed_full: 'completed'
  },
  fr: {
    title: 'Liste de Tâches',
    addPlaceholder: 'Que faut-il faire ?',
    addButton: 'Ajouter',
    nothingTodo: 'Aucune tâche pour le moment. Ajoutez-en une !',
    priority: {
      low: 'Basse',
      medium: 'Moyenne',
      high: 'Haute'
    },
    completed: 'sur',
    completed_full: 'terminées'
  }
};

export type Language = 'en' | 'fr';