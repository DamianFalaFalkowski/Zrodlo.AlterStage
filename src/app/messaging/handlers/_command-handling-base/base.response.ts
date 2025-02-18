import { BitFieldResolvable, InteractionReplyOptions, MessageFlags } from "discord.js";

// TODO: dodać logowanie

/** Klasa bazowa reprezentująca odpowiedz na polecenie wysłane z aplikacji Discord 
Klasy dziedziczące powinny zawierać (*):
 - Przygotowanie odpowiedzi błędu wraz ze wszystkimi potrzebnymi komponentami
 - Przygotowanie odpowiedzi sukcesu wraz ze wszystkimi potrzebnymi komponentami
 - Odpowiedź błędu/sukcesu powinna być generowana tylko raz. Próby wygenerowania jej po raz kolejny powinny być blokowane przez zmienną 'IsReady'
 - Generowanie poprawnej odpowiedzi powinno być poprzedzone sprawdzeniem poprawności i kompletności wszystkich wymaganych komponentów

 (*) - (większość z poniszych jest zapewnine przez klasę bazową. Nie nalezy ingerować w sposób jej działania) 
*/
export abstract class BaseCommandResponse {
// Metody do implementacji w klasach dziedziczących
    /** Przygotowuje i zwraca odpowiedź informującą o błędzie. */
    protected abstract PepeareFailureResponse(): InteractionReplyOptions;  

    /** Przygotowuje i zwraca odpowiedź informującą o sukcesie */
    protected abstract PrepeareSuccessResponse(): InteractionReplyOptions;

    /** Przestrzeń na implementację zasad kompletności specyficznych dla danego polecenia dziedziczącego */
    protected abstract EnsureReadyAndValid(): boolean;

// Zmienne dostępne publicznie
    /** Umozliwia wgląd w rygenerowaną odpowiedź. Przed wygenerowaniem odpowiedzi powinna zawsze zwracać wartość 'null' */
    public get Reply(): InteractionReplyOptions {
        if(!this._isReady) throw Error("Odpoweidź nie jest gotowa do wysyłki.");
    return this._reply!;
    }

// Zmienne chronione
    /** Określa czy odpowiedz jest przygotowana i poprawna */
    protected get IsReady() { return this._isReady; };

    /** Określa czy odpowiedź jest odpowiedzią błędu */
    protected get IsFailure() { return this._isFailure; };

    /** Określa czy aplikacja ma być widoczna w aplikacji Discord tylko dla uzytkownika inicjującego interakcję. Ustawiana w konstruktorze i wyłacznie do odczytu. */
    private readonly _isEphemeral: boolean;

// Zmienne prywatne
    private _reply: InteractionReplyOptions | undefined;
    private _isReady: boolean = false;
    private _isFailure: boolean = false;

// Konstruktor
    constructor(isEphemeral: boolean) {
        this._isEphemeral = isEphemeral;
    }

// Metody publiczne
    /** Przygotowuje i zwraca odpowiedź informującą o sukcesie na poziomie bazowym */
    public PrepeareSuccessResponseBase(
        content :string, 
        components: any[] | null = null, 
        flags: BitFieldResolvable<"SuppressEmbeds" | "Ephemeral" | "SuppressNotifications", MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral | MessageFlags.SuppressNotifications> | null = null)
    {
        if (this.ensureReadyAndValidBase()) 
            throw new Error('Sprawdzanie poprawności odpowiedzi zakonczone niepowodzneiem.');
        try{
            this._reply = { 
                content: content,
                components: components!,
                flags: flags!
            }
            this._reply.flags = this._isEphemeral ? MessageFlags.Ephemeral : this._reply.flags;       
            this._isReady = true;
            this.PrepeareSuccessResponse();
        }catch(error){
            throw error;
        }      
    }

    /** Przygotowuje i zwraca odpowiedź informującą o błędzie na poziomie bazowym */
    public PepeareFailureResponseBase(errorMessage: string) {
        try {
            this._reply!.content = errorMessage;
            this._reply!.flags = MessageFlags.Ephemeral;
            this._isFailure = true;
            this._isReady = true;
            this.PepeareFailureResponse();
        } catch (error) {
            throw error;
        }
    }

// Metody prywatne
    /** sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny na poziomie bazowym */ 
    // TODO: przerobic tak, zeby zwracalo informacie o problemach
    private ensureReadyAndValidBase(): boolean {
        if(this._reply!.content === undefined ||
            (this._isEphemeral && this._reply!.flags !== MessageFlags.Ephemeral))
            return false;
        return this.EnsureReadyAndValid();
    }
}