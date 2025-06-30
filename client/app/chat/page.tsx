'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreHorizontal,
  Search,
  Users,
  Settings,
  Plus,
  Circle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
  fileName?: string;
}

interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: Date;
  department?: string;
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  avatar?: string;
}

export default function ChatPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string | null>('1');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const users: ChatUser[] = [
    {
      id: '1',
      name: 'Ahmad Al-Mansouri',
      email: 'ahmad@raqmena.com',
      status: 'online',
      department: 'Engineering',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@raqmena.com',
      status: 'online',
      department: 'HR',
    },
    {
      id: '3',
      name: 'Mohammed Ibrahim',
      email: 'mohammed@raqmena.com',
      status: 'away',
      department: 'Accounting',
    },
    {
      id: '4',
      name: 'Fatima Hassan',
      email: 'fatima@raqmena.com',
      status: 'busy',
      department: 'Marketing',
    },
  ];

  const chatRooms: ChatRoom[] = [
    {
      id: '1',
      name: 'Engineering Team',
      type: 'group',
      participants: ['1', '2', '3'],
      unreadCount: 3,
      lastMessage: {
        id: '1',
        senderId: '2',
        senderName: 'Sarah Johnson',
        content: 'The new feature is ready for testing',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: 'text',
      },
    },
    {
      id: '2',
      name: 'Ahmad Al-Mansouri',
      type: 'direct',
      participants: ['1'],
      unreadCount: 0,
      lastMessage: {
        id: '2',
        senderId: '1',
        senderName: 'Ahmad Al-Mansouri',
        content: 'Thanks for the update!',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        type: 'text',
      },
    },
    {
      id: '3',
      name: 'Project Alpha',
      type: 'group',
      participants: ['1', '3', '4'],
      unreadCount: 1,
      lastMessage: {
        id: '3',
        senderId: '4',
        senderName: 'Fatima Hassan',
        content: 'Meeting scheduled for tomorrow',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'text',
      },
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: '2',
      senderName: 'Sarah Johnson',
      content: 'Hey team! How is everyone doing with the new project?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'text',
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'Ahmad Al-Mansouri',
      content: 'Going well! Just finished the authentication module.',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      type: 'text',
    },
    {
      id: '3',
      senderId: '3',
      senderName: 'Mohammed Ibrahim',
      content: 'Great work! I\'ve updated the database schema accordingly.',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      type: 'text',
    },
    {
      id: '4',
      senderId: user?.id || '1',
      senderName: user?.name || 'You',
      content: 'Perfect! Let me know if you need any help with testing.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text',
    },
    {
      id: '5',
      senderId: '2',
      senderName: 'Sarah Johnson',
      content: 'The new feature is ready for testing',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'text',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedRoom) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: user?.id || '1',
      senderName: user?.name || 'You',
      content: message,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const selectedRoomData = chatRooms.find(room => room.id === selectedRoom);
  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="h-[calc(100vh-8rem)] flex gap-4">
        {/* Sidebar */}
        <Card className="w-80 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {t('chat.title')}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={language === 'ar' ? 'البحث في المحادثات...' : 'Search conversations...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full">
              <div className="space-y-1 p-3">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedRoom === room.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={room.avatar} />
                        <AvatarFallback>
                          {room.type === 'group' ? (
                            <Users className="w-4 h-4" />
                          ) : (
                            room.name.split(' ').map(n => n[0]).join('')
                          )}
                        </AvatarFallback>
                      </Avatar>
                      {room.type === 'direct' && (
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor('online')}`} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{room.name}</p>
                        {room.lastMessage && (
                          <span className="text-xs opacity-70">
                            {formatTime(room.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      {room.lastMessage && (
                        <p className="text-sm opacity-70 truncate">
                          {room.lastMessage.content}
                        </p>
                      )}
                    </div>
                    
                    {room.unreadCount > 0 && (
                      <Badge className="bg-primary text-primary-foreground">
                        {room.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          {selectedRoomData ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedRoomData.avatar} />
                      <AvatarFallback>
                        {selectedRoomData.type === 'group' ? (
                          <Users className="w-4 h-4" />
                        ) : (
                          selectedRoomData.name.split(' ').map(n => n[0]).join('')
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedRoomData.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedRoomData.type === 'group' 
                          ? `${selectedRoomData.participants.length} ${language === 'ar' ? 'أعضاء' : 'members'}`
                          : language === 'ar' ? 'متصل' : 'Online'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <Separator />

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${
                          msg.senderId === user?.id ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {msg.senderId !== user?.id && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {msg.senderName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[70%] ${msg.senderId === user?.id ? 'order-first' : ''}`}>
                          {msg.senderId !== user?.id && (
                            <p className="text-xs text-muted-foreground mb-1">
                              {msg.senderName}
                            </p>
                          )}
                          <div
                            className={`chat-message ${
                              msg.senderId === user?.id ? 'own' : 'other'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                        
                        {msg.senderId === user?.id && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {user?.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <Separator />

              {/* Message Input */}
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder={t('chat.sendMessage')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                    >
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                <p>{language === 'ar' ? 'اختر محادثة للبدء' : 'Select a conversation to start chatting'}</p>
              </div>
            </div>
          )}
        </Card>

        {/* Online Users */}
        <Card className="w-64">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">
              {language === 'ar' ? 'المتصلون الآن' : 'Online Now'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-full">
              <div className="space-y-2 p-3">
                {users.filter(u => u.status === 'online').map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}