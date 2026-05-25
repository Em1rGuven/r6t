package database

import (
	"log"
	"os"
	"r6t_v2/types"
	"strconv"
	"strings"
)

func (s *ServerDI) GetWords(userID int) []types.Word {
	result := make([]types.Word, 0)
	num := 10
	data, err := os.ReadFile("config.txt")
	if err == nil {
		num, _ = strconv.Atoi(strings.TrimSpace(string(data)))
	}

	query := `
		SELECT w.engWord, w.turWord, w.picture, s.sample
		FROM words w
		JOIN samples s ON w.wordID = s.wordID
		LEFT JOIN wordStates ws ON w.wordID = ws.wordID AND ws.userID = ?
		WHERE (ws.id IS NULL OR (ws.counter < 6 AND (ws.cannotAskUntil IS NULL OR ws.cannotAskUntil <= date('now'))))
		GROUP BY w.wordID
		ORDER BY RANDOM()
		LIMIT ?`

	rows, err := s.DB.Query(query, userID, num)
	if err != nil {
		log.Println(err)
		return result
	}
	defer func() { _ = rows.Close() }()

	for rows.Next() {
		var w types.Word
		err := rows.Scan(&w.English, &w.Turkish, &w.Picture, &w.Sample)
		if err == nil {
			result = append(result, w)
		}
	}
	return result
}
