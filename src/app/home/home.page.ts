import { Component } from '@angular/core';
import { VaultService, VaultServiceState } from '../vault.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public state: VaultServiceState;

  constructor(private vaultService: VaultService) {
    this.state = vaultService.state;
  }

  async setSession(data: string) {
    await this.vaultService.setSession(data);
  }

  async restoreSession() {
    await this.vaultService.restoreSession();
  }

  lockVault() {
    this.vaultService.lockVault();
  }
  
  unlockVault() {
    this.vaultService.unlockVault();
  }
}