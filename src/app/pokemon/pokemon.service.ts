import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { Pokemon } from "./pokemon";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  // getPokemonList(): Pokemon[] {
  //   return POKEMONS;
  // }
  // getPokemonById(pokemonId: number): Pokemon | undefined {
  //   return POKEMONS.find((pokemon) => pokemon.id == pokemonId);
  // }

  getPokemonList(): Observable<Pokemon[]> {
    //url to web api
    return this.http.get<Pokemon[]>("api/pokemons").pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  updatePokemon(pokemon: Pokemon): Observable<null> {
    return this.http.put("api/pokemons", pokemon, this.httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http
      .post<Pokemon>("api/pokemons", pokemon, this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  /**
   * return all the authorized pokemon type in the app
   */
  getPokemonTypeList(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Electrik",
      "Poison",
      "Fée",
      "Vol",
      "Combat",
      "Psy",
    ];
  }

  //UTILS

  private log(response: any) {
    console.table(response);
  }

  /**
   * Handle Http operation that failed
   * @param error
   * @param errorValueByDefault
   * @returns
   */
  private handleError(error: Error, errorValueByDefault: any) {
    //console.log in red
    console.error(error);
    return of(errorValueByDefault);
  }
}
