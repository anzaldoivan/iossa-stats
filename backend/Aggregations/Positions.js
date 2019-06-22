const fullnames = {
	'd1t2': 'Liga D1 - Temporada 2',
	'd2t1': 'Liga D2 - Temporada 1',
	'd1t3': 'Liga D1 T3',
	'd2t3': 'Liga D1 T3',
	'maradeit3a': 'Cop} Maradei T3 - Grupo A',
	'maradeit3b': 'Copa Maradei T3 - Grupo B',
	'maradeit3c': 'Copa Maradei T3 - Grupo C',
	'maradeit3d': 'Copa Maradei T3 - Grupo D'
};

module.exports = (arg) => {
	return (
		[{$match: {
			torneo: fullnames[arg]
		  }}, {$project: {
			teams: 1
		  }}, {$unwind: {
			path: '$teams',
			includeArrayIndex: '<<string>>',
			preserveNullAndEmptyArrays: false
		  }}, {$group: {
			_id: '$teams.teamname',
			PJ: {
			  $sum: 1
			},
			teaminfo: {
			  $last: "$teams.teaminfo"
			},
			results: {
			  $push: '$teams.result'
			},
			scores: {
			  $push: '$teams.score'
			},
			conceded: {
			  $push: '$teams.scorereceived'
			}
		  }}, {$addFields: {
			Pts: {
			  $add: [
				{
				  $multiply: [
					{
					  $size: {
						$filter: {
						  input: '$results',
						  as: 'a',
						  cond: {
							$eq: [
							  '$$a',
							  1
							]
						  }
						}
					  }
					},
					3
				  ]
				},
				{
				  $multiply: [
					{
					  $size: {
						$filter: {
						  input: '$results',
						  as: 'a',
						  cond: {
							$eq: [
							  '$$a',
							  0
							]
						  }
						}
					  }
					},
					1
				  ]
				}
			  ]
			},
			GF: {
			  $sum: '$scores'
			},
			GC: {
			  $sum: '$conceded'
			},
			PG: {
			  $size: {
				$filter: {
				  input: '$results',
				  as: 'a',
				  cond: {
					$eq: [
					  '$$a',
					  1
					]
				  }
				}
			  }
			},
			PE: {
			  $size: {
				$filter: {
				  input: '$results',
				  as: 'a',
				  cond: {
					$eq: [
					  '$$a',
					  0
					]
				  }
				}
			  }
			},
			PP: {
			  $size: {
				$filter: {
				  input: '$results',
				  as: 'a',
				  cond: {
					$eq: [
					  '$$a',
					  -1
					]
				  }
				}
			  }
			},
			DF: {
			  $subtract: [
				{
				  $sum: '$scores'
				},
				{
				  $sum: '$conceded'
				}
			  ]
			}
		  }}, {$project: {
			results: 0,
			scores: 0,
			conceded: 0
		  }}, {$sort: {
			Pts: -1,
			PJ: 1,
			DF: -1
		  }}]
	)
}