'use client';

import { useState, useMemo } from 'react';
import { Icon } from '@/lib/icons';
import { User, mockUsers } from '@/lib/archetypes';

interface ColleagueSelectorProps {
  onSelect: (user: User) => void;
  selectedUserId?: string;
}

export default function ColleagueSelector({ onSelect, selectedUserId }: ColleagueSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search colleagues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-10 rounded-button border border-flix-grayscale-20 bg-flix-background text-flix-grayscale-100 placeholder-flix-grayscale-50 text-[14px] focus:outline-none focus:border-flix-primary focus:ring-1 focus:ring-flix-primary/20 transition-colors"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-flix-grayscale-50">
          <Icon name="Search" size={18} />
        </span>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-flix-grayscale-70 py-12 text-[14px]">No colleagues found</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(user)}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(user)}
              className={`
                p-4 rounded-card cursor-pointer transition-all duration-200
                flex items-center gap-3
                ${
                  selectedUserId === user.id
                    ? 'bg-flix-primary/10 border border-flix-primary/20'
                    : 'bg-flix-background border border-flix-grayscale-20 hover:border-flix-grayscale-30'
                }
              `}
            >
              <div className="w-10 h-10 rounded-lg bg-flix-primary/15 flex items-center justify-center text-flix-primary font-semibold text-[14px] flex-shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-flix-grayscale-100 text-[14px]">{user.name}</h3>
                <p className="text-[13px] text-flix-grayscale-70">{user.role}</p>
                <p className="text-[12px] text-flix-grayscale-50">{user.department}</p>
              </div>
              {selectedUserId === user.id && (
                <Icon name="Check" size={20} className="text-flix-primary flex-shrink-0" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
