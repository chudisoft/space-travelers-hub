import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewMission = ({ add, categories }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(categories[0]);

  NewMission.propTypes = {
      add: PropTypes.func.isRequired,
      categories: PropTypes.array.isRequired,
  };

  return (
    <div className='new-mission'>
        <h2 className='form-title'>Add New Mission</h2>
        <form
          className='add-form'
          onSubmit={
            (e) => {
              e.preventDefault();
              add(title, author, category);
              setAuthor('');
              setTitle('');
            }
          }
        >
          <input
            className='input title-input'
            required
            type="text"
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className='input title-input'
            required
            type="text"
            value={author}
            placeholder='Author'
            onChange={(e) => setAuthor(e.target.value)}
          />
          <select
            className='input category-input'
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            {
              categories.map((c) => (
                <option>{c}</option>
              ))
            }
          </select>
          <button className='primary-button-big' type='submit'>Add Mission</button>
        </form>
    </div>
  );
};

export default NewMission;
