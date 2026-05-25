package database

import "time"

func (s *ServerDI) UpdateWordStates(userID int, word string, state bool) error {
	var (
		exist  bool
		wordID int
	)

	err := s.DB.QueryRow("SELECT wordID from words WHERE engWord = ?", word).Scan(&wordID)
	if err != nil {
		return err
	}

	err = s.DB.QueryRow("SELECT EXISTS(SELECT 1 FROM wordStates WHERE userID = ? AND wordID = ?)", userID, wordID).Scan(&exist)
	if err != nil {
		return err
	}

	today := time.Now()
	if !exist {
		today = today.AddDate(0, 0, 1)
		formatted := today.Format("2006-01-02")
		_, err = s.DB.Exec(""+
			"INSERT INTO wordStates(userID, wordID, counter, cannotAskUntil) VALUES (?, ?, ?, ?)", userID, wordID, 1, formatted)
		return err
	} else if !state {
		formatted := today.Format("2006-01-02")
		_, err = s.DB.Exec("UPDATE wordStates SET counter = 0, cannotAskUntil = ? WHERE userID = ? AND wordID = ?", formatted, userID, wordID)
		return err
	}
	var counter int
	err = s.DB.QueryRow("SELECT counter FROM wordStates WHERE userID = ? AND wordID = ?", userID, wordID).Scan(&counter)
	if err != nil {
		return err
	}
	switch counter {
	case 0:
		today = today.AddDate(0, 0, 1)
	case 1:
		today = today.AddDate(0, 0, 7)
	case 2:
		today = today.AddDate(0, 1, 0)
	case 3:
		today = today.AddDate(0, 3, 0)
	case 4:
		today = today.AddDate(0, 6, 0)
	case 5:
		today = today.AddDate(1, 0, 0)
	default:
		return nil
	}
	formatted := today.Format("2006-01-02")
	_, err = s.DB.Exec("UPDATE wordStates SET counter = counter + 1, cannotAskUntil = ? WHERE userID = ? AND wordID = ?", formatted, userID, wordID)
	if err != nil {
		return err
	}
	return nil
}
