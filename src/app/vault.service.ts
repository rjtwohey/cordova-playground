import { Injectable, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  Vault,
  Device,
  DeviceSecurityType,
  VaultType,
  BrowserVault,
  IdentityVaultConfig,
} from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

const config: IdentityVaultConfig = {
  key: 'io.ionic.getstartedivangular',
  type: VaultType.SecureStorage,
  deviceSecurityType: DeviceSecurityType.None,
  lockAfterBackgrounded: 2000,
  shouldClearVaultAfterTooManyFailedAttempts: true,
  customPasscodeInvalidUnlockAttempts: 2,
  unlockVaultOnLoad: false,
};
const key = 'sessionData';

export interface VaultServiceState {
  session: string;
  isLocked: boolean;
}

@Injectable({ providedIn: 'root' })
export class VaultService {
  public state: VaultServiceState = {
    session: "",
    isLocked: false
  };

  vault: Vault | BrowserVault;

  constructor(private ngZone: NgZone, private platform: Platform) {
    this.vault = Capacitor.getPlatform() === "web" ? new BrowserVault(config) : new Vault(config);
  }

  async init() {
    await this.platform.ready(); // This is required only for Cordova

    this.vault.onLock(() => {
      this.ngZone.run(() => {
        this.state.isLocked = true;
        this.state.session = undefined;
      });
    });

    this.vault.onUnlock(() => {
      this.ngZone.run(() => {
        this.state.isLocked = false;
      });
    });
  }

  async setSession(value: string): Promise<void> {
    this.state.session = value;
    await this.vault.setValue(key, value);
  }

  async restoreSession() {
    const value = await this.vault.getValue(key);
    this.state.session = value;
  }

  async lockVault() {
    await this.vault.lock();
  }
  
  async unlockVault() {
    await this.vault.unlock();
  }
}