


# I.About

1.Struktura folderów

Opis plików które folder zawiera oraz jego roli:
    src -> 
        główny folder projektu, ma zawierać tylko plik index.ts który ma być najbardziej ogólnym minimalnym sposobem uruchomienia aplikacji
    src/app/app.data -> 
        moduly baz danych
    src/app/app/modules -> 
        lokalizacja wszystkich mogułów czysto aplikacujnych/coreowych
    src/discord -> 
        rozszerzenia/modyfikacje i inne dot. bibliotego discord.js i generalnie komunikacji z discord
    src/modules -> 
        moduły uzytkowe
    src/startup -> 
        wszystkie konfiguracje uruchomieniowe
    src/utils -> 
        uzytecznosci

    ....

2.Nazewnictwo

    Zmienne poprzedzone podwójnym podkreśleniem '__' to zmienne globalne moliwe do uycia w całym projekcie

2.1.Nazewnictwo DB

    kolumny będące FK rozpoczynają się od nazwy schematu zaczynając od duzej litery

DOKUMENTAJA POLECEN (/): 
    https://discord.com/developers/docs/interactions/application-commands#contexts