//  RootViewController.swift

import UIKit

class RootViewController: UIViewController {
  
  // Allow background observation of remote control events
  override func canBecomeFirstResponder() -> Bool {
    return true
  }
  
  override func viewDidAppear(animated: Bool) {
    super.viewDidAppear(animated)
    
    // Start listening for remote control events
    self.becomeFirstResponder()
    UIApplication.sharedApplication().beginReceivingRemoteControlEvents()
  }
  
  override func viewWillDisappear(animated: Bool) {
    super.viewWillDisappear(animated)
    
    // Stop listening for remote control events
    self.resignFirstResponder()
    UIApplication.sharedApplication().endReceivingRemoteControlEvents()
  }
}