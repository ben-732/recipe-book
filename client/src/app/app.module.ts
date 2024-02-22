import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from '../generated/api.module';
import { HomeComponent } from './pages/home/home.component';
import { ViewRecipeComponent } from './pages/view-recipe/view-recipe.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    ApiModule.forRoot({ rootUrl: 'api/' }),
  ],
  declarations: [AppComponent, HomeComponent, ViewRecipeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
