package database

import (
	"os"
	"strconv"
	"strings"
)

func (s *ServerDI) GetRandomWords() ([]string, error) {
	result := make([]string, 0)
	num := 10
	data, err := os.ReadFile("config.txt")
	if err == nil {
		num, _ = strconv.Atoi(strings.TrimSpace(string(data)))
	}

	rows, err := s.DB.Query("SELECT turWord FROM words ORDER BY RANDOM() LIMIT ?", 2*num)
	if err != nil {
		return result, err
	}
	defer func() { _ = rows.Close() }()

	for rows.Next() {
		var word string
		err = rows.Scan(&word)
		if err != nil {
			return result, err
		}

		result = append(result, word)
	}
	return result, nil
}
