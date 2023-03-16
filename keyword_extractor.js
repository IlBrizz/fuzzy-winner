// Funzione per gestire la ricerca dei libri
function searchBooks() {
  // Ottieni la parola chiave inserita dall'utente
  const keyword = document.getElementById('keyword').value.trim();

  // Controlla se l'utente ha inserito una parola chiave
  if (!keyword) {
    alert('Inserisci una parola chiave per la ricerca!');
    return;
  }

  // Effettua la chiamata AJAX per ottenere i libri
  $.ajax({
    url: `https://api.myjson.com/bins/${jsonUrl}`,
    dataType: 'json',
    success: function(data) {
      // Filtra i libri in base alla parola chiave
      const filteredBooks = data.filter(book =>
        book.title.toLowerCase().includes(keyword.toLowerCase())
      );

      // Filtra i libri in base agli altri criteri
      const filteredBooks2 = filteredBooks.filter(book =>
        book.resultCount < 800 &&
        book.titleCount >= 6 &&
        book.daysSincePublication >= 30 &&
        book.maxBsrEbook < 80000 &&
        book.maxBsrPaperback < 200000 &&
        book.avgReviews <= 100 &&
        book.maxPrice <= 14.90 &&
        !book.famousAuthor &&
        !book.trademark
      );

      // Se ci sono libri, mostra la tabella
      if (filteredBooks2.length > 0) {
        // Aggiungi i libri alla tabella
        const tbody = document.querySelector('#results tbody');
        tbody.innerHTML = '';
        filteredBooks2.forEach(book => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.reviewCount}</td>
            <td>${book.publicationDate}</td>
            <td>${book.maxPrice}</td>
            <td>${book.maxBsrEbook}</td>
            <td>${book.maxBsrPaperback}</td>
          `;
          tbody.appendChild(row);
        });

        // Mostra la tabella
        document.getElementById('results').classList.remove('d-none');
        document.getElementById('no-results').classList.add('d-none');
      } else {
        // Nascondi la tabella e mostra il messaggio
        document.getElementById('results').classList.add('d-none');
        document.getElementById('no-results').classList.remove('d-none');
      }
    },
    error: function() {
      alert('Errore durante il recupero dei dati!');
    }
  });
}
