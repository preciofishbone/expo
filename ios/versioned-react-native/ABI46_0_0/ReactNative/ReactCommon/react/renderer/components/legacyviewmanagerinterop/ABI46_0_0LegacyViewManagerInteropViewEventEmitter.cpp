/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#include "ABI46_0_0LegacyViewManagerInteropViewEventEmitter.h"
#include <iostream>

namespace ABI46_0_0facebook {
namespace ABI46_0_0React {
void LegacyViewManagerInteropViewEventEmitter::dispatchEvent(
    std::string const &type,
    folly::dynamic const &payload) const {
  EventEmitter::dispatchEvent(type, payload);
}

} // namespace ABI46_0_0React
} // namespace ABI46_0_0facebook
