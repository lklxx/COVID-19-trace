#!/bin/bash

vegeta attack -targets=header -rate=100 -duration=600s -output=tmp.bin
rm tmp.bin
