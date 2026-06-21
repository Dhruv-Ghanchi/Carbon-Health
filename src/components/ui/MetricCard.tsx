import React from 'react';
import { AppCard } from './AppCard';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  trend?: {
    value: string;
    isPositive: boolean; // positive means good for the user, usually negative emissions
  };
}

export function MetricCard({ title, value, subtitle, icon, className, trend }: MetricCardProps) {
  return (
    <AppCard className={cn("flex flex-col", className)}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
        {icon && <div className="text-carbon-500">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <div className="text-4xl font-bold text-carbon-900">{value}</div>
      </div>
      {(subtitle || trend) && (
        <div className="flex items-center gap-2 mt-auto pt-2">
          {trend && (
            <span className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-full",
              trend.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {trend.value}
            </span>
          )}
          {subtitle && <p className="text-sm text-gray-500 font-medium">{subtitle}</p>}
        </div>
      )}
    </AppCard>
  );
}
