export enum UserActionType 
{
    /** Użytkownik został zarejestrowany (przesłał zdjęcie weryfikacyjne na kanale registracyjnym) */
    REGISTRATION = 'REGISTRATION',

    /** Zdjęcie przesłane na etapie rejestracji zostało zweryfikowane (poprzez weryfikację online lub offline) */
    TRUSTED = 'TRUSTED',

    /** Neutralna informacje o uytkowniku */
    INFORMATION = 'INFORMATION',
}