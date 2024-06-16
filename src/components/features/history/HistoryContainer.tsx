import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGameDataAPI } from "@/adapters/api/game/api";
import { HistoryPresenter } from "@/components/features/history/HistoryPresenter";

export function HistoryContainer() {


  return (
    <HistoryPresenter />
  );
}
