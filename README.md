# Parco della Favorita — Studio di fattibilità e valorizzazione

Sito statico dello Studio di fattibilità e valorizzazione del Parco della Favorita (Comune di Palermo).

## Da dove si parte

Il sito nasceva come progetto **MkDocs + tema Material**: navigazione a tab generata da `mkdocs.yml`, ricerca Lunr, nessun componente PA (niente header/footer istituzionali, nessuna dichiarazione di accessibilità, nessuna palette/font ufficiali AGID).

## Cosa è stato fatto

Refactoring dell'HTML generato per portarlo a conformità **AGID / Designers Italia**, adottando **Bootstrap Italia** come libreria di componenti:

- Header e footer istituzionali (logo ente, menu, note legali, privacy, accessibilità, mappa del sito).
- Navigazione a menu/dropdown e breadcrumb coerenti su tutte le pagine, al posto della sidebar Material.
- Componenti di contenuto (card grid, pulsanti download, gallerie immagini) riscritti secondo il markup Bootstrap Italia.
- Ricerca sostituita con **Pagefind**, mantenendo la copertura completa dei contenuti.
- Bonifica dei link interni e degli URL: nessun path storico rotto, sito reso indipendente dal sotto-percorso GitHub Pages originale.
- Correzioni minori di contenuto (titoli, dati di contatto, refusi) allineate alla versione pubblicata.

Il riferimento di progetto per questa migrazione è `Favorita-Agid/docs/piano-migrazione-agid.md` (repo sorella), che descrive il piano completo a fasi. **Nota:** quel piano lavora su un progetto sorgente Eleventy (`Favorita-BootstrapItalia/`); questa cartella è invece l'HTML già generato, rifinito direttamente — eventuali correzioni fatte qui vanno riportate anche ai template Eleventy per non perderle a un rebuild successivo.

## Come eseguire in locale

```bash
python3 -m http.server 8000
```

## Punti aperti

- Riportare le correzioni applicate qui nei template Eleventy sorgente.
- Confermare con il committente l'autenticità della Dichiarazione di Accessibilità collegata in footer.
- Audit di accessibilità "vivo" (Lighthouse/axe-core, screen reader) ancora da eseguire in un ambiente con browser.
