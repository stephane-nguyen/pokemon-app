import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
// import { PokemonDetailComponent } from "./pokemon/pokemon-detail/pokemon-detail.component";
// import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";

const routes: Routes = [
  //   { path: "pokemons", component: PokemonListComponent },
  //   { path: "pokemon/:id", component: PokemonDetailComponent },
  { path: "", redirectTo: "/pokemons", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
