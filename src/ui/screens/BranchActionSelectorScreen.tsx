import React from "react";
import { Box, Text, useInput } from "ink";
import { Select, type SelectItem } from "../components/common/Select.js";
import { Footer } from "../components/parts/Footer.js";
import type { BranchAction } from "../types.js";

export interface BranchActionSelectorScreenProps {
  selectedBranch: string;
  onUseExisting: () => void;
  onCreateNew: () => void;
  onBack: () => void;
}

/**
 * BranchActionSelectorScreen - Screen for selecting action after branch selection
 *
 * Allows user to choose between:
 * - Using existing branch (continue to AI tool selection)
 * - Creating new branch from selected branch (go to branch creator)
 */
export function BranchActionSelectorScreen({
  selectedBranch,
  onUseExisting,
  onCreateNew,
  onBack,
}: BranchActionSelectorScreenProps) {
  // Handle keyboard input for back navigation
  useInput((input, key) => {
    if (key.escape) {
      onBack();
    }
  });

  const items: SelectItem[] = [
    {
      label: "Use existing branch",
      value: "use-existing",
    },
    {
      label: "Create new branch",
      value: "create-new",
    },
  ];

  const handleSelect = (item: SelectItem) => {
    const action = item.value as BranchAction;

    if (action === "use-existing") {
      onUseExisting();
    } else if (action === "create-new") {
      onCreateNew();
    }
  };

  // Footer actions
  const footerActions = [
    { key: 'enter', description: 'Select' },
    { key: 'esc', description: 'Back' },
  ];

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>
          Selected branch: <Text bold color="cyan">{selectedBranch}</Text>
        </Text>
      </Box>
      <Box marginBottom={1}>
        <Text color="gray">Choose an action:</Text>
      </Box>
      <Select items={items} onSelect={handleSelect} />

      {/* Footer */}
      <Footer actions={footerActions} />
    </Box>
  );
}
