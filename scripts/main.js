/*
 *
 *  Push Notifications codelab
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

/* eslint-env browser, es6 */

"use strict";

// application server keys 公钥
// 生成地址 https://web-push-codelab.glitch.me/
const applicationServerPublicKey =
  "BAU7IR2lmJINafwwk6mMt-S5YeVxGOTW1qKHVrt_ZZNKhpfVX1ARCY3jYypebD7CeTO0ghCpdyzY5kdpFboNs6w";

const pushButton = document.querySelector(".js-push-btn");

let isSubscribed = false;
// ServiceWorker 注册成功后会返回一个 ServiceWorkerRegistration，用它来访问推送管理 API。
let swRegistration = null;

// 将启用推送按钮，以及更改用户是否订阅的文本
function updateButtonUI() {
  if (isSubscribed) {
    pushButton.textContent = "Disable Push Messaging";
  } else {
    pushButton.textContent = "Enable Push Messaging";
  }
  pushButton.disabled = false;
}

// 更新 UI 界面展示 subscription
function updateSubscriptionTextUI(subscription) {
  const subscriptionJson = document.querySelector(".js-subscription-json");
  const subscriptionDetails = document.querySelector(
    ".js-subscription-details"
  );

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove("is-invisible");
  } else {
    subscriptionDetails.classList.add("is-invisible");
  }
}

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// 保存服务端
function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server
}

// 使用 PushManager 订阅一个用户
function subscribeUserToPush() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      console.log("User is subscribed:", subscription);

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;

      updateButtonUI();
      updateSubscriptionTextUI(subscription);
    })
    .catch(function(err) {
      console.log("Failed to subscribe the user: ", err);
      updateButtonUI();
    });
}

// 使用 PushManager 取消订阅一个用户
function unsubscribeUserToPush() {
  // 首先获取当前的订阅
  swRegistration.pushManager
    .getSubscription()
    .then(function(subscription) {
      // 如果 subscription 存在，调用其 unsubscribe 方法
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function(error) {
      console.log("Error unsubscribing", error);
    })
    .then(function() {
      updateSubscriptionOnServer(null);

      console.log("User is unsubscribed.");
      isSubscribed = false;

      updateButtonUI();
    });
}

function initialiseState() {
  pushButton.addEventListener("click", function() {
    // 用户点击按钮后，我们先设置按钮处于不可点击状态，防止用户重复订阅消息
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUserToPush();
    } else {
      subscribeUserToPush();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription().then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log("User IS subscribed.");
      updateSubscriptionTextUI(subscription);
    } else {
      console.log("User is NOT subscribed.");
    }

    updateButtonUI();
  });
}

if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker and Push is supported");
  navigator.serviceWorker
    .register("sw.js")
    .then(function(swReg) {
      console.log("Service Worker is registered", swReg);

      swRegistration = swReg;

      initialiseState();
    })
    .catch(function(error) {
      console.error("Service Worker Error", error);
    });
} else {
  console.warn("Push messaging is not supported");
  pushButton.textContent = "Push Not Supported";
}
