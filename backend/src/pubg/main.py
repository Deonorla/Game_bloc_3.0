from pubg_python import PUBG, Shard

api = PUBG('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhMTc5NTJjMC05N2YyLTAxM2ItMTAzZC0wNTFiYTE3ZTlmN2MiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjc3NDA5MTk3LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImdhbWUtYmxvYyJ9.IjYPFzvE_AtJMWlOIfkiocmV70hjwyKwjMFazVhWUQ8', Shard.PC_NA)

sample = api.samples().get()
for match in sample.matches:
    print(match.id)

players = api.players().filter(player_ids=['account.3654e255b77b409e87b10dcb086ab00d'])

for player in players:
    player_name = player.name
    print(player_name)

# player = api.players().get('account.3654e255b77b409e87b10dcb086ab00d')
# for match in player.matches:
#     match_data = api.matches().get(match.id)

players = api.players().filter(player_names = ['epickitten', 'Name2'])

for player in players:
    player_id = player.id 
    print(player_id)

match = api.matches().get('276f5bcb-a831-4e8c-a610-d2073692069e')

match_ids = [
    '276f5bcb-a831-4e8c-a610-d2073692069e',
    'fasf9082-21de-dkle-13ke-qlamd13nab3a',
]
matches = api.matches().filter(match_ids=match_ids)
for match in matches:
    print(match)