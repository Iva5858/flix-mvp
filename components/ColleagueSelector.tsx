'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, mockUsers } from '@/lib/archetypes';

interface ColleagueSelectorProps {
  onSelect: (user: User) => void;
  selectedUserId?: string;
}

export default function ColleagueSelector({ onSelect, selectedUserId }: ColleagueSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search colleagues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-button border border-flix-grayscale-30 bg-flix-background text-flix-grayscale-100 placeholder-flix-grayscale-50 focus:outline-none focus:border-flix-primary"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-flix-grayscale-50">🔍</span>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-flix-grayscale-70 py-8">No colleagues found</p>
        ) : (
          filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(user)}
              className={`
                p-4 rounded-card border-2 cursor-pointer transition-all
                ${
                  selectedUserId === user.id
                    ? 'border-flix-primary bg-flix-primary/10'
                    : 'border-flix-grayscale-30 bg-flix-background hover:border-flix-primary/50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-flix-primary flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-flix-grayscale-100">{user.name}</h3>
                  <p className="text-sm text-flix-grayscale-70">{user.role}</p>
                  <p className="text-xs text-flix-grayscale-50">{user.department}</p>
                </div>
                {selectedUserId === user.id && (
                  <div className="text-flix-primary text-xl">✓</div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

