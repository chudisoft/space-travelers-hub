import React from "react";
import PropTypes from "prop-types";

const Book = ({ book, comments, edit, remove, updateProgress }) => {
  Book.propTypes = {
    book: PropTypes.array.isRequired,
    comments: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    updateProgress: PropTypes.func.isRequired,
  };

  return (
    <div className="book">
      <div className="book-info">
        <h4 className="book-category">{book.category}</h4>
        <h2 className="book-title">{book.title}</h2>
        <h6 className="book-author">{book.author}</h6>
        <div className="action-buttons">
          <button
            className="button-outline"
            type="button"
            onClick={() => comments(book)}
          >
            Comments
          </button>
          <div className="vertical-divider"></div>
          <button
            className="button-outline"
            type="button"
            onClick={() => remove(book)}
          >
            Remove
          </button>
          <div className="vertical-divider"></div>
          <button
            className="button-outline"
            type="button"
            onClick={() => edit(book)}
          >
            Edit
          </button>
        </div>
      </div>
      <div class="progress">
        <div class="circular-progress-container">
          <div class="circular-progress"></div>
        </div>
        <div class="progress-stat">
          <p class="percent-complete">64%</p>
          <p class="completed">Completed</p>
        </div>
        <div class="progress-divider"></div>
        <div class="current-chapter-container">
          <div>
            <p class="current-chapter-label">CURRENT CHAPTER</p>
            <p class="current-chapter">Chapter 17</p>
          </div>
          <div>
            <button class="primary-button" type="button">
              UPDATE PROGRESS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
