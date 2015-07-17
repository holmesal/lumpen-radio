//  RootViewController.swift

import UIKit

class RootViewController: UIViewController {
  
  override func canBecomeFirstResponder() -> Bool {
    return true
  }
  
  override func viewDidAppear(animated: Bool) {
    super.viewDidAppear(animated)
    self.becomeFirstResponder()
    UIApplication.sharedApplication().beginReceivingRemoteControlEvents()
  }
  
  override func viewWillDisappear(animated: Bool) {
    super.viewWillDisappear(animated)
    self.resignFirstResponder()
    UIApplication.sharedApplication().endReceivingRemoteControlEvents()
  }
}