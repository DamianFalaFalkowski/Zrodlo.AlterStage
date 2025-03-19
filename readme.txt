


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

3.Modularność zastosowana w projekcie

    Niniejsza aplikacja stosuje autorskie rozwiązanie dot. modularności. Kazdy z modułów odpowiada za ściśle określoną funkcjonalność lub zestaw funkcjonalności umozliwiających funkcjonowanie pojedyńczego obszaru aplikacji. 

    Kazdy moduł to odseperowany byt. Posiada dostęp do określonych w nim funkcjonalności oraz do współdzielonych utilities. Jedynym sposobem na komunikację pomiędzy modułami jest uzycie Integracji.

    Integracja to finkcjonalność lub zestaw funkcjonalnosci udostepnianych przez modul do uzycia w innych modulach. 

    Rozrózniamy dwa rodzaje modułów:
    - Moduły aplikacyjne - umieszczone w folderze './src/app' odpowiadają za wszystkie moduły infrastrukturalne aplikacji. Te moduły powstają w pierwszej kolejności poniewaz są odpowiedzialne za kluczowe dla działania aplikacji obszary. 
    - Moduły funkcjonalne - umieszczone w folderze './src/modules'. Tutaj znajdować się będą wszystkie moduły funkcjonalne aplikacji. Działanie modułów aplikacyjnych nie moze byc uzaleznione od istnienia modułów funkcjonalnych. 

DOKUMENTAJA POLECEN (/): 
    https://discord.com/developers/docs/interactions/application-commands#contexts