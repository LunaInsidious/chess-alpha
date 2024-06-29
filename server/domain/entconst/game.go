package entconst

type Result string

const (
	CPUWin         Result = "CPUWin"         // CPUが勝った。人狼の勝ち
	SucceedToCheat Result = "SucceedToCheat" // 人狼がバレなかった。人狼の勝ち
	FailedToCheat  Result = "FailedToCheat"  // 人狼がバレた。市民の勝ち
	CPULose        Result = "CPULose"        // CPUが負けた。市民の勝ち
	Stalemate      Result = "Stalemate"      // ステイルメイト。引き分け
	UnderResource  Result = "UnderResource"  // 戦力不足。引き分け
	FiftyRule      Result = "FiftyRule"      // 50手ルール。引き分け
)

func (r Result) String() string {
	return string(r)
}

func validateResult(result string) error {
	switch Result(result) {
	case "", CPUWin, CPULose, SucceedToCheat, FailedToCheat, Stalemate, UnderResource, FiftyRule:
		return nil
	default:
		return NewValidationErrorFromMsg("invalid result")
	}
}

func ConvertResultFromString(result string) (Result, error) {
	if err := validateResult(result); err != nil {
		return "", err
	}
	return Result(result), nil
}

func GetRateDiff(result Result, isCitizen bool) int {
	switch result {
	case CPUWin, SucceedToCheat:
		if isCitizen {
			return -10
		}
		return 10
	case CPULose, FailedToCheat:
		if isCitizen {
			return 10
		}
		return -10
	default:
		return 0
	}
}
