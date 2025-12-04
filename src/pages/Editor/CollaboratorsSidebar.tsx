import React from 'react';
import { Card } from '@/components/ui';

const COLLABORATORS = [
  { id: 1, name: '我', color: 'bg-blue-100 text-blue-600' },
  { id: 2, name: '导', color: 'bg-yellow-100 text-yellow-600' },
];

export const CollaboratorsSidebar: React.FC = () => (
  <Card className="p-4">
    <h4 className="text-sm font-bold text-slate-700 mb-3">当前在线</h4>
    <div className="flex items-center gap-3">
      {COLLABORATORS.map((collaborator) => (
        <div key={collaborator.id} className="relative">
          <div
            className={`w-8 h-8 rounded-full ${collaborator.color} flex items-center justify-center font-bold text-xs`}
          >
            {collaborator.name}
          </div>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
        </div>
      ))}
    </div>
  </Card>
);
