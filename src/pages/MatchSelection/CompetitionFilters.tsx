import React from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import type { CompetitionFilter, Discipline, DifficultyLevel, CompetitionCycle, ValueLevel } from '@/types';
import { ALL_DISCIPLINES, ALL_DIFFICULTIES, ALL_CYCLES, ALL_VALUES } from '@/data/mock';

interface CompetitionFiltersProps {
  filter: CompetitionFilter;
  onChange: (filter: CompetitionFilter) => void;
  onClear: () => void;
}

// 标签选择组件
interface TagSelectorProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: T[];
  onChange: (selected: T[]) => void;
  colorMap?: Record<string, string>;
}

function TagSelector<T extends string>({
  label,
  options,
  selected,
  onChange,
  colorMap,
}: TagSelectorProps<T>) {
  const toggleOption = (option: T) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-2">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map(option => {
          const isSelected = selected.includes(option);
          const baseColor = colorMap?.[option] || 'bg-slate-100 text-slate-700';
          const selectedColor = colorMap?.[option]
            ? colorMap[option].replace('100', '200').replace('700', '800')
            : 'bg-violet-100 text-violet-700';

          return (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                isSelected
                  ? `${selectedColor} ring-2 ring-offset-1 ring-violet-400`
                  : `${baseColor} hover:ring-1 hover:ring-slate-300`
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// 颜色映射
const disciplineColors: Record<Discipline, string> = {
  '计算机': 'bg-blue-100 text-blue-700',
  '电子信息': 'bg-cyan-100 text-cyan-700',
  '机械工程': 'bg-slate-100 text-slate-700',
  '土木建筑': 'bg-orange-100 text-orange-700',
  '经济管理': 'bg-emerald-100 text-emerald-700',
  '文学艺术': 'bg-pink-100 text-pink-700',
  '数学建模': 'bg-purple-100 text-purple-700',
  '创新创业': 'bg-rose-100 text-rose-700',
  '外语': 'bg-indigo-100 text-indigo-700',
  '综合类': 'bg-gray-100 text-gray-700',
};

const difficultyColors: Record<DifficultyLevel, string> = {
  '入门': 'bg-emerald-100 text-emerald-700',
  '进阶': 'bg-blue-100 text-blue-700',
  '挑战': 'bg-orange-100 text-orange-700',
  '顶尖': 'bg-red-100 text-red-700',
};

const valueColors: Record<ValueLevel, string> = {
  'S+': 'bg-yellow-100 text-yellow-700',
  'S': 'bg-amber-100 text-amber-700',
  'A': 'bg-violet-100 text-violet-700',
  'B': 'bg-slate-100 text-slate-700',
  'C': 'bg-gray-100 text-gray-600',
};

const cycleColors: Record<CompetitionCycle, string> = {
  '月赛': 'bg-teal-100 text-teal-700',
  '季赛': 'bg-sky-100 text-sky-700',
  '半年赛': 'bg-indigo-100 text-indigo-700',
  '年赛': 'bg-violet-100 text-violet-700',
};

export const CompetitionFilters: React.FC<CompetitionFiltersProps> = ({
  filter,
  onChange,
  onClear,
}) => {
  const hasActiveFilters =
    (filter.disciplines?.length || 0) > 0 ||
    (filter.difficulties?.length || 0) > 0 ||
    (filter.cycles?.length || 0) > 0 ||
    (filter.values?.length || 0) > 0;

  const activeFilterCount =
    (filter.disciplines?.length || 0) +
    (filter.difficulties?.length || 0) +
    (filter.cycles?.length || 0) +
    (filter.values?.length || 0);

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-500" />
          <span className="font-medium text-slate-800">筛选条件</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs rounded-full">
              {activeFilterCount} 项
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
          >
            <X size={14} />
            清除筛选
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-4">
        {/* 学科 */}
        <TagSelector<Discipline>
          label="学科方向"
          options={ALL_DISCIPLINES}
          selected={filter.disciplines || []}
          onChange={(disciplines) => onChange({ ...filter, disciplines })}
          colorMap={disciplineColors}
        />

        {/* 难度 */}
        <TagSelector<DifficultyLevel>
          label="难度等级"
          options={ALL_DIFFICULTIES}
          selected={filter.difficulties || []}
          onChange={(difficulties) => onChange({ ...filter, difficulties })}
          colorMap={difficultyColors}
        />

        {/* 含金量 */}
        <TagSelector<ValueLevel>
          label="含金量"
          options={ALL_VALUES}
          selected={filter.values || []}
          onChange={(values) => onChange({ ...filter, values })}
          colorMap={valueColors}
        />

        {/* 周期 */}
        <TagSelector<CompetitionCycle>
          label="赛事周期"
          options={ALL_CYCLES}
          selected={filter.cycles || []}
          onChange={(cycles) => onChange({ ...filter, cycles })}
          colorMap={cycleColors}
        />
      </div>
    </div>
  );
};

// 简化版筛选器（用于移动端或紧凑布局）
export const CompetitionFiltersCompact: React.FC<CompetitionFiltersProps> = ({
  filter,
  onChange,
  onClear,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const activeFilterCount =
    (filter.disciplines?.length || 0) +
    (filter.difficulties?.length || 0) +
    (filter.cycles?.length || 0) +
    (filter.values?.length || 0);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
          activeFilterCount > 0
            ? 'border-violet-200 bg-violet-50 text-violet-700'
            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
        }`}
      >
        <Filter size={16} />
        <span className="text-sm font-medium">筛选</span>
        {activeFilterCount > 0 && (
          <span className="px-1.5 py-0.5 bg-violet-600 text-white text-xs rounded-full">
            {activeFilterCount}
          </span>
        )}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-lg z-50 p-4">
            <CompetitionFilters filter={filter} onChange={onChange} onClear={onClear} />
          </div>
        </>
      )}
    </div>
  );
};
