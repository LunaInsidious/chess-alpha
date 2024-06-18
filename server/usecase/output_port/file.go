package output_port

type FileDriver interface {
	CopyFile(srcId, dstId string) error
	CreatePreSignedURLForGet(filepath string) (string, error)
	CreatePreSignedURLForPut(filepath string) (string, error)
	DeleteFileWithPath(filepath string) error
}
