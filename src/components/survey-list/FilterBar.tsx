import { Box, Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

const categories = ['Customer Satisfaction', 'Workplace', 'Health'];
const creators = ['John Doe', 'Jane Smith', 'Alice Johnson'];

const FilterBar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedCreator, setSelectedCreator] = useState('');

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as string);
  };

  const handleCreatorChange = (event: SelectChangeEvent) => {
    setSelectedCreator(event.target.value as string);
  };

  const handleDelete = (filter: string) => {
    if (filter === 'category') setSelectedCategory('');
    if (filter === 'sort') setSortOrder('');
    if (filter === 'creator') setSelectedCreator('');
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '0',
        zIndex: 1000,
        backgroundColor: 'white',
        paddingY: '1rem',
        borderBottom: '1px solid #ddd',
      }}
    >
      {/* Filter Dropdowns */}
      <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
        {/* Category Dropdown */}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Survey Category</InputLabel>
          <Select value={selectedCategory} label="Survey Category" onChange={handleCategoryChange}>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort Dropdown */}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort</InputLabel>
          <Select value={sortOrder} label="Sort" onChange={handleSortChange}>
            <MenuItem value="most-popular">Most Popular</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>

        {/* Creator Dropdown */}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Creator</InputLabel>
          <Select value={selectedCreator} label="Creator" onChange={handleCreatorChange}>
            {creators.map((creator) => (
              <MenuItem key={creator} value={creator}>
                {creator}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Selected Filter Chips */}
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        {selectedCategory && <Chip label={selectedCategory} onDelete={() => handleDelete('category')} />}
        {sortOrder && (
          <Chip
            label={sortOrder === 'most-popular' ? 'Most Popular' : 'Newest'}
            onDelete={() => handleDelete('sort')}
          />
        )}
        {selectedCreator && <Chip label={selectedCreator} onDelete={() => handleDelete('creator')} />}
      </Box>
    </Box>
  );
};

export default FilterBar;
