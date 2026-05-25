package database

func (s *ServerDI) GetProgression(userID int) (int, int, error) {
	var (
		total, completed int
	)
	err := s.DB.QueryRow("SELECT COUNT(*) FROM words").Scan(&total)
	if err != nil {
		return 0, 0, err
	}

	query := `
	SELECT COUNT(DISTINCT W.wordID)
	FROM words W
	INNER JOIN wordStates WS
	ON W.wordID = WS.wordID
	WHERE WS.counter >= 6 AND WS.userID = ?
	`
	err = s.DB.QueryRow(query, userID).Scan(&completed)
	if err != nil {
		return 0, 0, err
	}
	return completed, total, nil
}

func (s *ServerDI) GetLearnedWords(userID int) ([]string, error) {
	learned := make([]string, 0)
	query := `
		SELECT W.engWord
		FROM words W INNER JOIN wordStates WS ON W.wordID = WS.wordID
		WHERE WS.userID = ? AND WS.counter = 6
	`
	rows, err := s.DB.Query(query, userID)
	if err != nil {
		return learned, err
	}
	defer func() { _ = rows.Close() }()

	for rows.Next() {
		var word string
		err = rows.Scan(&word)
		if err != nil {
			return learned, err
		}

		learned = append(learned, word)
	}
	return learned, nil
}
