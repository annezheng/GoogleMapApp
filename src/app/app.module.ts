import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { SearchService } from './search.service';
import { MarkerService } from './marker.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5wlnZgzxXiZCycRdJcV9OYCabXLevMGk'
    }),
  ],
  providers: [SearchService, MarkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
