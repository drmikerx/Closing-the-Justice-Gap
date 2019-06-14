//question page after selection a category and submitting the form on question main page
function getCategoryQuestions() {
      var category = document.getElementById('questionCategorySelect').value;
      console.log('category: '+category);

      // Redirect to URI with params
      window.location = '/questionMain/filter/' + category;
};
