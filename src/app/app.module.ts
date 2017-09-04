import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { AboutComponent } from './main/about/about.component';
import { ServiceComponent } from './main/service/service.component';
import { PortfolioComponent } from './main/portfolio/portfolio.component';
import { TeamComponent } from './main/team/team.component';
import { CtaComponent } from './main/cta/cta.component';
import { PricingComponent } from './main/pricing/pricing.component';
import { TestimonialsComponent } from './main/testimonials/testimonials.component';
import { SubscriptionComponent } from './main/subscription/subscription.component';
import { BlogComponent } from './main/blog/blog.component';
import { ContactComponent } from './main/contact/contact.component';
import { MapComponent } from './main/map/map.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    PortfolioComponent,
    TeamComponent,
    CtaComponent,
    PricingComponent,
    TestimonialsComponent,
    SubscriptionComponent,
    BlogComponent,
    ContactComponent,
    MapComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
