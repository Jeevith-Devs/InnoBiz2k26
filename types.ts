/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Event {
  id: string;
  name: string;
  category: 'Technical' | 'Non-Technical';
  description: string;
  image: string;
  rules: string[];
  teamSize: string;
  // Optional Google Form link for registration
  formLink?: string;
  // Optional PDF file path for rules download
  rulesFile?: string;
  prizes: {
    first: string;
    second: string;
    third: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  day: string;
  image: string;
}