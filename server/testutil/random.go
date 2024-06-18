package testutil

import (
	"math/rand"
	"time"
)

func RandInt(i int) int {
	// nolint
	return rand.Intn(i)
}

func RandIntBetween(firstNumber, width int) int {
	// nolint
	return firstNumber + RandInt(width)
}

func RandDate() time.Time {
	jst, _ := time.LoadLocation("Asia/Tokyo")
	return time.Date(
		RandIntBetween(2020, 3),
		time.Month(RandIntBetween(1, 12)),
		RandIntBetween(1, 28),
		0,
		0,
		0,
		0,
		jst,
	)
}

func RandDateFrom(fromYear int, width int) time.Time {
	jst, _ := time.LoadLocation("Asia/Tokyo")
	return time.Date(
		RandIntBetween(fromYear, width),
		time.Month(RandIntBetween(1, 12)),
		RandIntBetween(1, 28),
		0,
		0,
		0,
		0,
		jst,
	)
}

func getRuneAt(s string, i int) rune {
	rs := []rune(s)
	return rs[i]
}

func RandStr(length int) string {
	const letters = "あいうえおかきくけこたちつてとなにぬねのはひふへほ"
	ret := ""
	var randInt int
	for i := 0; i < length; i++ {
		randInt = RandInt(len(letters) / 3)
		ret = ret + string(getRuneAt(letters, randInt))
	}
	return ret
}

func RandStrEn(length int) string {
	const letters = "abcdefghijklmnopqrstuvwxyz"
	ret := ""
	var randInt int
	for i := 0; i < length; i++ {
		randInt = RandInt(len(letters))
		ret = ret + string(getRuneAt(letters, randInt))
	}
	return ret
}
