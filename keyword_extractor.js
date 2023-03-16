$(document).ready(function() {

  // Funzione per eseguire la ricerca dei libri
  function searchBooks() {
    var keyword = $("#keyword").val(); // recupera la parola chiave dalla textbox
    var maxResults = $("#maxResults").val(); // recupera il numero massimo di risultati dalla textbox
    var maxPrice = $("#maxPrice").val(); // recupera il prezzo massimo dalla textbox

    // Controlla se il prezzo massimo è valido e maggiore di zero
    if (isNaN(maxPrice) || maxPrice <= 0) {
      alert("Inserire un prezzo massimo valido");
      return;
    }

    // Effettua la chiamata AJAX per recuperare i dati dal server
    $.ajax({
      url: "/search_books",
      type: "POST",
      data: { keyword: keyword, max_results: maxResults, max_price: maxPrice },
      dataType: "json",
      success: function(data) {
        // Aggiorna la tabella con i dati dei libri
        updateTable(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Errore durante la ricerca dei libri: " + textStatus);
      }
    });
  }

  // Funzione per aggiornare la tabella con i dati dei libri
  function updateTable(data) {
    var table = $("#bookTable tbody");
    table.empty(); // svuota la tabella precedente

    // Aggiunge i dati di ogni libro alla tabella
    for (var i = 0; i < data.length; i++) {
      var book = data[i];
      var row = $("<tr>");
      row.append($("<td>").text(book.title));
      row.append($("<td>").text(book.author));
      row.append($("<td>").text(book.num_reviews));
      row.append($("<td>").text(book.publication_date));
      row.append($("<td>").text(book.price));
      row.append($("<td>").text(book.bsr));
      table.append(row);
    }

    // Mostra la tabella
    $("#bookTable").show();
  }

  // Aggiungi l'evento click al pulsante di ricerca
  $("#searchBtn").click(searchBooks);

});
