package database

func (s *ServerDI) GetUserID(username string) (int, error) {
	var id int
	err := s.DB.QueryRow("SELECT userID FROM users WHERE userName = ?", username).Scan(&id)
	if err != nil {
		return -1, err
	}
	return id, err
}
