interface GoogleSheetsName {
  Name: string;
  Gender: string;
  Origin: string;
  Religion: string;
  Zodiac: string;
  Popularity: string;
  Meaning: string;
}

export interface ParsedName {
  id: string;
  slug: string;
  name: {
    en: string;
    hi: string;
  };
  meaning: {
    en: string;
    hi: string;
  };
  gender: 'boy' | 'girl' | 'unisex';
  origin: string;
  religion: string;
  zodiac: string;
  popularity: number;
}

const SPREADSHEET_ID = '1E9CJZq9e767GKxyua2KT0kaLBnySEQvoBfR_n52JVCc';
const CSV_ENDPOINT = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv`;

// Helper function to parse CSV
function parseCSV(csvText: string): GoogleSheetsName[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(value => value.replace(/"/g, '').trim());
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      
      return row as GoogleSheetsName;
    });
}

// Helper function to create slug
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to normalize gender
function normalizeGender(gender: string): 'boy' | 'girl' | 'unisex' {
  if (!gender) {
    return 'unisex';
  }
  const normalized = gender.toLowerCase().trim();
  if (normalized === 'male' || normalized === 'boy' || normalized === 'm') return 'boy';
  if (normalized === 'female' || normalized === 'girl' || normalized === 'f') return 'girl';
  return 'unisex';
}

// Helper function to normalize religion
function normalizeReligion(religion: string): string {
  if (!religion) {
    return 'other';
  }
  const normalized = religion.toLowerCase().trim();
  const religionMap: Record<string, string> = {
    'hindu': 'hindu',
    'hinduism': 'hindu',
    'muslim': 'muslim',
    'islam': 'muslim',
    'islamic': 'muslim',
    'christian': 'christian',
    'christianity': 'christian',
    'sikh': 'sikh',
    'sikhism': 'sikh',
    'jain': 'jain',
    'jainism': 'jain',
    'buddhist': 'buddhist',
    'buddhism': 'buddhist'
  };
  
  if (!normalized) {
    return 'other';
  }
  
  return religionMap[normalized] || normalized;
}

// Transform Google Sheets data to our format
function transformToNameFormat(sheetsData: GoogleSheetsName[]): ParsedName[] {
  return sheetsData
    .filter(row => row.Name && row.Name.trim())
    .map((row, index) => ({
      id: `gs-${index + 1}`,
      slug: createSlug(row.Name),
      name: {
        en: row.Name.trim(),
        hi: row.Name.trim() // You can add Hindi translations later
      },
      meaning: {
        en: row.Meaning?.trim() || 'Beautiful name',
        hi: row.Meaning?.trim() || 'सुंदर नाम' // You can add Hindi translations later
      },
      gender: normalizeGender(row.Gender),
      origin: row.Origin?.trim() || 'Unknown',
      religion: normalizeReligion(row.Religion),
      zodiac: row.Zodiac?.trim() || '',
      popularity: parseInt(row.Popularity) || Math.floor(Math.random() * 100) + 1
    }));
}

export const googleSheetsService = {
  async fetchNames(): Promise<ParsedName[]> {
    try {
      const response = await fetch(CSV_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      const sheetsData = parseCSV(csvText);
      const transformedData = transformToNameFormat(sheetsData);
      
      console.log(`Fetched ${transformedData.length} names from Google Sheets`);
      return transformedData;
      
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      // Return empty array on error, component will handle fallback
      return [];
    }
  },

  // Get unique values for filters
  getFilterOptions(names: ParsedName[]) {
    const genders = [...new Set(names.map(name => name.gender))];
    const religions = [...new Set(names.map(name => name.religion))].filter(Boolean);
    const origins = [...new Set(names.map(name => name.origin))].filter(Boolean);

    return {
      genders: genders.sort(),
      religions: religions.sort(),
      origins: origins.sort()
    };
  },

  // Filter names based on criteria
  filterNames(names: ParsedName[], filters: {
    gender?: string;
    religion?: string;
    origin?: string;
    search?: string;
  }) {
    return names.filter(name => {
      // Gender filter
      if (filters.gender && filters.gender !== 'all' && name.gender !== filters.gender) {
        return false;
      }

      // Religion filter
      if (filters.religion && filters.religion !== 'all' && name.religion !== filters.religion) {
        return false;
      }

      // Origin filter
      if (filters.origin && filters.origin !== 'all' && name.origin !== filters.origin) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return (
          name.name.en.toLowerCase().includes(searchTerm) ||
          name.name.hi.toLowerCase().includes(searchTerm) ||
          name.meaning.en.toLowerCase().includes(searchTerm) ||
          name.meaning.hi.toLowerCase().includes(searchTerm)
        );
      }

      return true;
    });
  }
};
