import React from 'react';

export interface BaseEntity {
  id: string;
  name: string;
}

export interface Unit extends BaseEntity {
  category: 'Unit/Count' | 'Weight' | 'Volume' | 'Length' | 'Custom';
  shortName: string;
}

export interface Tax extends BaseEntity {
  rate: number;
  isDefault?: boolean;
}

export interface Currency extends BaseEntity {
  symbol: string;
  isDefault?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  group: string;
  taxCode?: string;
  email?: string;
  phone: string;
  address: string;
  customerType?: string;
  vatPayer?: boolean;
}

export interface NavigationItem {
  name: string;
  icon: React.ComponentType<any>;
  path: string;
}