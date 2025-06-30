'use client';

import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/language-context';
import {
  Plus,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  Paperclip,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
} from 'lucide-react';

interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: {
    name: string;
    avatar?: string;
  };
  dueDate: string;
  comments: number;
  attachments: number;
  tags: string[];
  status: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
  color: string;
}

const initialColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-gray-100',
    tasks: [
      {
        id: '1',
        title: 'User Authentication System',
        description: 'Implement JWT-based authentication',
        priority: 'high',
        assignee: { name: 'Ahmad Ali', avatar: '' },
        dueDate: '2024-01-20',
        comments: 3,
        attachments: 2,
        tags: ['backend', 'security'],
        status: 'todo',
      },
      {
        id: '2',
        title: 'Database Schema Design',
        description: 'Design database schema for user management',
        priority: 'medium',
        assignee: { name: 'Sarah Johnson', avatar: '' },
        dueDate: '2024-01-25',
        comments: 1,
        attachments: 0,
        tags: ['database', 'design'],
        status: 'todo',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-blue-100',
    tasks: [
      {
        id: '3',
        title: 'Frontend Dashboard',
        description: 'Create responsive dashboard interface',
        priority: 'high',
        assignee: { name: 'Mohammed Ibrahim', avatar: '' },
        dueDate: '2024-01-22',
        comments: 5,
        attachments: 4,
        tags: ['frontend', 'ui'],
        status: 'in-progress',
      },
      {
        id: '4',
        title: 'API Integration',
        description: 'Integrate third-party payment API',
        priority: 'medium',
        assignee: { name: 'Fatima Hassan', avatar: '' },
        dueDate: '2024-01-28',
        comments: 2,
        attachments: 1,
        tags: ['api', 'integration'],
        status: 'in-progress',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-yellow-100',
    tasks: [
      {
        id: '5',
        title: 'Code Review',
        description: 'Review authentication module code',
        priority: 'low',
        assignee: { name: 'John Smith', avatar: '' },
        dueDate: '2024-01-18',
        comments: 0,
        attachments: 0,
        tags: ['review', 'quality'],
        status: 'review',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-100',
    tasks: [
      {
        id: '6',
        title: 'Project Setup',
        description: 'Initialize project structure and dependencies',
        priority: 'high',
        assignee: { name: 'Ahmad Ali', avatar: '' },
        dueDate: '2024-01-15',
        comments: 8,
        attachments: 3,
        tags: ['setup', 'infrastructure'],
        status: 'done',
      },
    ],
  },
];

function KanbanCard({ task }: { task: KanbanTask }) {
  const { language } = useLanguage();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }, []);

  const isOverdue = new Date(task.dueDate) < new Date();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`kanban-card ${isDragging ? 'dragging' : ''}`}
    >
      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-sm font-medium line-clamp-2">
                {task.title}
              </CardTitle>
              <CardDescription className="text-xs mt-1 line-clamp-2">
                {task.description}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Priority and Due Date */}
          <div className="flex items-center justify-between text-xs">
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600' : 'text-muted-foreground'}`}>
              <Calendar className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString()}
              {isOverdue && <AlertCircle className="w-3 h-3" />}
            </div>
          </div>

          {/* Assignee and Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={task.assignee.avatar} />
                <AvatarFallback className="text-xs">
                  {task.assignee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {task.assignee.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {task.comments > 0 && (
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {task.comments}
                </div>
              )}
              {task.attachments > 0 && (
                <div className="flex items-center gap-1">
                  <Paperclip className="w-3 h-3" />
                  {task.attachments}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KanbanColumn({ column }: { column: KanbanColumn }) {
  const { language } = useLanguage();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getColumnIcon = useCallback((id: string) => {
    switch (id) {
      case 'todo':
        return <Clock className="w-4 h-4" />;
      case 'in-progress':
        return <User className="w-4 h-4" />;
      case 'review':
        return <AlertCircle className="w-4 h-4" />;
      case 'done':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  }, []);

  const getColumnTitle = useCallback((id: string) => {
    if (language === 'ar') {
      switch (id) {
        case 'todo':
          return 'للقيام';
        case 'in-progress':
          return 'قيد التنفيذ';
        case 'review':
          return 'مراجعة';
        case 'done':
          return 'مكتمل';
        default:
          return column.title;
      }
    }
    return column.title;
  }, [language, column.title]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="kanban-column"
    >
      <div className={`${column.color} rounded-lg p-4 min-h-[600px]`}>
        <div className="flex items-center justify-between mb-4" {...listeners}>
          <div className="flex items-center gap-2">
            {getColumnIcon(column.id)}
            <h3 className="font-semibold text-sm">
              {getColumnTitle(column.id)}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {column.tasks.length}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        <SortableContext items={column.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {column.tasks.map((task) => (
              <KanbanCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>

        {column.tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">
              {language === 'ar' ? 'لا توجد مهام' : 'No tasks'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null);
  const { language } = useLanguage();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap(column => column.tasks)
      .find(task => task.id === active.id);
    
    if (task) {
      setActiveTask(task);
    }
  }, [columns]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTaskId = active.id as string;
    const overColumnId = over.id as string;

    // Find the active task and its current column
    let activeTask: KanbanTask | null = null;
    let activeColumnIndex = -1;
    let activeTaskIndex = -1;

    for (let i = 0; i < columns.length; i++) {
      const taskIndex = columns[i].tasks.findIndex(task => task.id === activeTaskId);
      if (taskIndex !== -1) {
        activeTask = columns[i].tasks[taskIndex];
        activeColumnIndex = i;
        activeTaskIndex = taskIndex;
        break;
      }
    }

    if (!activeTask) return;

    // Find the target column
    const targetColumnIndex = columns.findIndex(column => column.id === overColumnId);
    
    if (targetColumnIndex === -1) return;

    // Create new columns array immutably
    setColumns(prevColumns => {
      const newColumns = prevColumns.map(column => ({ ...column, tasks: [...column.tasks] }));

      // If moving within the same column, reorder tasks
      if (activeColumnIndex === targetColumnIndex) {
        const reorderedTasks = arrayMove(newColumns[activeColumnIndex].tasks, activeTaskIndex, newColumns[targetColumnIndex].tasks.length);
        newColumns[activeColumnIndex] = {
          ...newColumns[activeColumnIndex],
          tasks: reorderedTasks
        };
      } else {
        // Moving to a different column
        // Remove task from source column
        const sourceTasks = [...newColumns[activeColumnIndex].tasks];
        sourceTasks.splice(activeTaskIndex, 1);
        newColumns[activeColumnIndex] = {
          ...newColumns[activeColumnIndex],
          tasks: sourceTasks
        };
        
        // Add task to target column
        const updatedTask = { ...activeTask, status: overColumnId };
        const targetTasks = [...newColumns[targetColumnIndex].tasks, updatedTask];
        newColumns[targetColumnIndex] = {
          ...newColumns[targetColumnIndex],
          tasks: targetTasks
        };
      }

      return newColumns;
    });
  }, [columns]);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {language === 'ar' ? 'لوحة المهام' : 'Kanban Board'}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            {language === 'ar' ? 'تصفية' : 'Filter'}
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            {language === 'ar' ? 'مهمة جديدة' : 'New Task'}
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-board">
          <SortableContext items={columns.map(column => column.id)}>
            {columns.map((column) => (
              <KanbanColumn key={column.id} column={column} />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeTask ? <KanbanCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}