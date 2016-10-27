var BookView = Backbone.View.extend({
  el: '.content-area',
  events: {

  },

  render: function(books){
    this.el.innerHTML = ''
    var self = this
    console.log("BookView render", books)
    books.forEach(function(book, index){
      var img = document.createElement('IMG')
      var div = document.createElement('DIV')
      var h6 = document.createElement('H6')
      div.classList.add('col-lg-2', 'col-md-3', 'col-sm-4', 'col-xs-6')
      var imgLink = book.get('imageLinks')

      if (imgLink === undefined) {
        img.src = 'images/default-book-cover.png'
      } else {
        img.src = imgLink.smallThumbnail
      }
      h6.textContent = book.get('title')
      div.appendChild(img)
      div.appendChild(h6)
      self.el.appendChild(div)
    })
  }
})
