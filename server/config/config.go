package config

import (
	"log"
	"os"
	"strconv"
)

var (
	awsAccessKeyId                string
	awsSecretAccessKey            string
	awsRegion                     string
	env                           string
	sigKey                        string // JWTトークンの署名
	slowQueryThresholdMilliSecond int64
)

func init() {
	sigKey = os.Getenv("SIG_KEY")
	if sigKey == "" {
		log.Print("SIG_KEY environment variable is empty")
	}
	env = os.Getenv("ENV")
	if env == "" {
		log.Print("ENV environment variable is empty")
	}
	awsAccessKeyId = os.Getenv("AWS_ACCESS_KEY_ID")
	if awsAccessKeyId == "" {
		log.Print("AWS_ACCESS_KEY_ID environment variable is empty")
	}
	awsSecretAccessKey = os.Getenv("AWS_SECRET_ACCESS_KEY")
	if awsSecretAccessKey == "" {
		log.Print("AWS_SECRET_ACCESS_KEY environment variable is empty")
	}
	awsRegion = os.Getenv("AWS_REGION")
	if awsRegion == "" {
		log.Print("AWS_REGION environment variable is empty")
	}
	th, err := strconv.ParseInt(os.Getenv("SLOW_QUERY_THRESHOLD_MILLISECOND"), 10, 64)
	if err != nil {
		log.Print("SLOW_QUERY_THRESHOLD_MILLISECOND environment variable is invalid.")
		slowQueryThresholdMilliSecond = 1000
	} else {
		slowQueryThresholdMilliSecond = th
	}
}

func IsDevelopment() bool {
	return env == "development"
}

func IsTest() bool {
	return env == "test"
}

func IsGitLabCI() bool {
	return env == "gitlab-ci"
}

func IsAWSConfigFilled() bool {
	return awsAccessKeyId != "" && awsSecretAccessKey != "" && awsRegion != ""
}

func AWSAccessKeyId() string {
	return awsAccessKeyId
}

func AWSSecretAccessKey() string {
	return awsSecretAccessKey
}

func AWSRegion() string {
	return awsRegion
}

func SigKey() string {
	return sigKey
}

func SlowQueryThresholdMilliSecond() int64 {
	return slowQueryThresholdMilliSecond
}
