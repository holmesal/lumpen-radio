//  RootViewController.swift

import UIKit

class RootViewController: UIViewController {

//  let audioManager: AudioManager = AudioManager()

  override func canBecomeFirstResponder() -> Bool {
    return true
  }

//  override func viewDidAppear(animated: Bool) {
//    super.viewDidAppear(animated)
//    self.becomeFirstResponder()
//    UIApplication.sharedApplication().beginReceivingRemoteControlEvents()
//  }

  override func remoteControlReceivedWithEvent(event: UIEvent) {
    let remoteControl = event.subtype
    println("received remote control \(remoteControl)")

    switch remoteControl {
      case .RemoteControlTogglePlayPause:
        println("play/pause toggled")
      case .RemoteControlPlay:
        println("play button pressed")
      case .RemoteControlPause:
        println("pause button pressed")
      default:
        break
    }
  }

//  deinit {
//    UIApplication.sharedApplication().endReceivingRemoteControlEvents();
//  }
}