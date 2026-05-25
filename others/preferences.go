package others

import (
	"errors"
	"os"
	"strconv"
)

func NumberOfWords(num int) error {
	if num < 0 || num > 20 {
		return errors.New("invalid number of times")
	}
	err := os.WriteFile("./config.txt", []byte(strconv.Itoa(num)), 0644)
	return err
}
