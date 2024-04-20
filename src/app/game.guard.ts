import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameService } from './game-service';

export const gameGuard: CanActivateFn = (route, state) => {
  const gameService = inject(GameService); 
  const router = inject(Router);

  const players = gameService.getPlayers();
  if (!players) {
    router.navigate(['']);
    return false;
  }
  return true;
};
