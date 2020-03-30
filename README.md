### Todos

- [ ] file 검사 로직 추가
- [ ] 업로드하면 자동 fetch()
- [ ] python 백그라운드 실행 로직 연결
- [ ] 가입시 자동 이동 안되는 버그

- [ ] ambient sound 로직 연동

## build

$> meteor npm install
$> meteor build .deploy/ --architecture os.linux.x86_64 --allow-superuser
$> tar -zxf .deploy/decowrite.tar.gz
$> cd .deploy/bundle/programs/server
$> meteor npm install
$> cd ../../
