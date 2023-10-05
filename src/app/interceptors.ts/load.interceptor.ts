import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoadInterceptor implements HttpInterceptor {

  constructor(public loadService:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadService.isLoading.next(true);

    return next.handle(request).pipe(
      finalize(
        () => {
          this.loadService.isLoading.next(false);
        }
      )
    )
  }
}
